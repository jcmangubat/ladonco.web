import { useEffect, useState } from "react";
import { ref, push, onValue, update, get, remove } from "firebase/database";
import { getDatabase } from "firebase/database";
import { formatDistanceToNow } from "date-fns";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
});

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

type CommentType = {
  id?: string;
  parentId?: string | null;
  username: string;
  message: string;
  timestamp: number;
  likes?: number;
  ownerId?: string;
  replies?: CommentType[];
};

function getInitials(name: string) {
  if (!name) return "";
  const words = name.trim().split(/\s+/);
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else {
    return words[0].substring(0, 2).toUpperCase();
  }
}

function getColorForInitials(initials: string) {
  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#FB923C",
    "#4ADE80",
  ];
  let hash = 0;
  for (let i = 0; i < initials.length; i++) hash += initials.charCodeAt(i);
  return colors[hash % colors.length];
}

const BlogComments = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [username, setUsername] = useState(
    () => localStorage.getItem("commentUsername") || ""
  );
  const [commentInput, setCommentInput] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalCallback, setModalCallback] = useState<
    (msg: string, name?: string) => void
  >(() => () => {});

  const [ownerId] = useState(() => {
    let id = localStorage.getItem("commentOwnerId");
    if (!id) {
      id = Math.random().toString(36).substring(2);
      localStorage.setItem("commentOwnerId", id);
    }
    return id;
  });

  const postComment = (message: string, parentId: string | null = null) => {
    if (!message.trim() || !username.trim()) return;
    const newComment: CommentType = {
      parentId,
      username: username.trim(),
      message: message.trim(),
      timestamp: Date.now(),
      likes: 0,
      ownerId,
    };
    push(ref(db, `comments/${slug}`), newComment);
  };

  const likeComment = async (id: string) => {
    const commentRef = ref(db, `comments/${slug}/${id}`);
    const snapshot = await get(commentRef);
    const currentLikes = snapshot.val()?.likes || 0;
    await update(commentRef, { likes: currentLikes + 1 });
  };

  const editComment = async (id: string, currentMsg: string) => {
    setModalMessage(currentMsg);
    setModalName(""); // editing doesn't ask for name
    setModalCallback(() => async (msg) => {
      if (msg.trim()) {
        const commentRef = ref(db, `comments/${slug}/${id}`);
        await update(commentRef, { message: msg.trim() });
      }
    });
    setModalOpen(true);
  };

  const deleteComment = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const commentRef = ref(db, `comments/${slug}/${id}`);
      await remove(commentRef);
    }
  };

  const openReplyModal = (parentId: string | null = null) => {
    setModalMessage("");
    const needName = !username.trim();
    setModalName(needName ? "" : "__skip__");
    setModalCallback(() => (msg, nameVal) => {
      if (nameVal && nameVal.trim() && !username.trim()) {
        setUsername(nameVal.trim());
        localStorage.setItem("commentUsername", nameVal.trim());
      }
      if (msg.trim()) postComment(msg, parentId);
    });
    setModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (modalName === "" && username.trim() === "") return; // require name first time
    modalCallback(
      modalMessage,
      modalName === "__skip__" ? undefined : modalName
    );
    setModalOpen(false);
    setModalMessage("");
    setModalName("");
  };

  useEffect(() => {
    const commentsRef = ref(db, `comments/${slug}`);
    const unsub = onValue(commentsRef, (snapshot) => {
      const val = snapshot.val() || {};
      const loaded: CommentType[] = Object.keys(val).map((key) => ({
        id: key,
        ...val[key],
        likes: Number(val[key].likes) || 0,
      }));
      setComments(loaded);
    });
    return () => unsub();
  }, [slug]);

  const buildThread = (allComments: CommentType[]) => {
    const map: { [key: string]: CommentType } = {};
    allComments.forEach((c) => (map[c.id!] = { ...c, replies: [] }));
    const rootComments: CommentType[] = [];
    allComments.forEach((c) => {
      if (c.parentId) {
        if (map[c.parentId]) {
          map[c.parentId].replies!.push(map[c.id!]);
        }
      } else {
        rootComments.push(map[c.id!]);
      }
    });
    const sortComments = (list: CommentType[]) => {
      list.sort((a, b) => b.timestamp - a.timestamp);
      list.forEach((c) => c.replies && sortComments(c.replies));
    };
    sortComments(rootComments);
    return rootComments;
  };

  const renderComments = (list: CommentType[], depth = 0) =>
    list.map((c) => {
      const initials = getInitials(c.username);
      const bgColor = getColorForInitials(initials);
      return (
        <div key={c.id} style={{ marginLeft: depth * 20 }} className="my-3">
          <div className="d-flex align-items-start">
            <div
              className="rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{
                width: 35,
                height: 35,
                fontWeight: "bold",
                backgroundColor: bgColor,
                fontSize: "13px",
              }}
            >
              {initials}
            </div>
            <div className="ms-2">
              <strong>{c.username}</strong>{" "}
              <small className="text-muted">
                {formatDistanceToNow(new Date(c.timestamp))} ago
              </small>
              <p>{c.message}</p>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => likeComment(c.id!)}
              >
                👍 {c.likes || 0}
              </button>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => openReplyModal(c.id!)}
              >
                Reply
              </button>
              {c.ownerId === ownerId && (
                <>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => editComment(c.id!, c.message)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteComment(c.id!)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          {c.replies &&
            c.replies.length > 0 &&
            renderComments(c.replies, depth + 1)}
        </div>
      );
    });

  return (
    <div className="comment-box mt-5">
      <h4>Leave a Comment</h4>
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          localStorage.setItem("commentUsername", e.target.value);
        }}
        className="form-control mb-2"
        required
      />
      <textarea
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Leave a comment..."
        className="form-control mb-2"
        rows={3}
      />
      <button
        className="btn btn-primary mb-4"
        disabled={!username.trim()}
        onClick={() => {
          if (!username.trim()) return;
          postComment(commentInput);
          setCommentInput("");
        }}
      >
        Post
      </button>
      <div className="comment-list">
        {renderComments(buildThread(comments))}
      </div>

      {modalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="bg-white p-3 rounded shadow"
            style={{ minWidth: 300 }}
          >
            <h5>Enter your reply</h5>
            {!username.trim() && (
              <input
                type="text"
                placeholder="Your name"
                className="form-control mb-2"
                value={modalName}
                onChange={(e) => setModalName(e.target.value)}
              />
            )}
            <textarea
              className="form-control mb-2"
              rows={3}
              value={modalMessage}
              onChange={(e) => setModalMessage(e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleModalSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogComments;
