import React, { useEffect, useRef, CSSProperties } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import styles from "@/styles/_components-reusables/_marquee-carousel.module.css";

gsap.registerPlugin(Draggable);

export interface MarqueeCarouselProps<T> {
  items: T[];
  speed?: number; // px/sec
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  customItemStyle?: CSSProperties; // style overrides
}

function MarqueeCarousel<T>({
  items,
  speed = 0.05,
  renderItem,
  className,
  customItemStyle = {},
}: MarqueeCarouselProps<T>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const initRef = useRef<{ cleanup?: () => void } | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let resizeTimeout: number | null = null;

    const waitForImages = (el: HTMLElement) =>
      new Promise<void>((resolve) => {
        const imgs = Array.from(
          el.querySelectorAll("img")
        ) as HTMLImageElement[];
        if (!imgs.length) {
          resolve();
          return;
        }
        let loaded = 0;
        const check = () => {
          loaded++;
          if (loaded === imgs.length) resolve();
        };
        imgs.forEach((img) => {
          if (img.complete) check();
          else img.addEventListener("load", check, { once: true });
          img.addEventListener("error", check, { once: true });
        });
      });

    const init = async () => {
      // cleanup if re-init
      initRef.current?.cleanup?.();

      await waitForImages(wrapper);

      const originalChildren = Array.from(wrapper.children) as HTMLElement[];

      const parentWidth =
        wrapper.parentElement?.offsetWidth || window.innerWidth;
      let totalWidth = wrapper.scrollWidth;

      // clone until >= 2x viewport width
      while (totalWidth < parentWidth * 2) {
        originalChildren.forEach((c) => wrapper.appendChild(c.cloneNode(true)));
        totalWidth = wrapper.scrollWidth;
        if (originalChildren.length === 0) break;
      }

      totalWidth = wrapper.scrollWidth;
      const half = totalWidth / 2;

      const proxy = { x: 0 };
      let isDragging = false;
      const wrapX = gsap.utils.wrap(-half, 0);

      gsap.set(wrapper, { x: 0 });

      const tick = (_: number, delta: number) => {
        if (!isDragging) {
          proxy.x -= speed * delta;
          gsap.set(wrapper, { x: wrapX(proxy.x) });
        }
      };
      gsap.ticker.add(tick);

      const proxyEl = document.createElement("div");
      proxyEl.style.cssText =
        "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;";
      document.body.appendChild(proxyEl);

      const drags = Draggable.create(proxyEl as any, {
        trigger: wrapper,
        type: "x",
        onPressInit() {
          isDragging = true;
        },
        onDrag(this: any) {
          proxy.x += this.deltaX;
          gsap.set(wrapper, { x: wrapX(proxy.x) });
        },
        onRelease(this: any) {
          isDragging = false;
          const vel = this.getVelocity("x") || 0;
          if (Math.abs(vel) > 50) {
            const throwDistance = vel * 0.25;
            gsap.to(proxy, {
              x: proxy.x + throwDistance,
              duration: Math.min(Math.abs(vel / 600), 1.2),
              ease: "power3.out",
              onUpdate: () => gsap.set(wrapper, { x: wrapX(proxy.x) }),
            });
          }
        },
        onDragStart(e) {
          e.preventDefault?.();
        },
      }) as any[];

      const cleanup = () => {
        gsap.ticker.remove(tick);
        drags.forEach((d) => d.kill());
        if (proxyEl.parentNode) document.body.removeChild(proxyEl);
      };

      initRef.current = { cleanup };
    };

    init();

    const onResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => init(), 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      initRef.current?.cleanup?.();
    };
  }, [items, speed]);

  // Convert customItemStyle into CSS variables
  const styleVars: CSSProperties = {};
  if (customItemStyle.height) styleVars["--custom-height"] = customItemStyle.height;
  if (customItemStyle.width) styleVars["--custom-width"] = customItemStyle.width;
  if (customItemStyle.padding) styleVars["--custom-padding"] = customItemStyle.padding;
  if (customItemStyle.margin) styleVars["--custom-margin"] = customItemStyle.margin;

  return (
    <div className={`${styles["marquee-carousel"]} ${className || ""}`}>
      <div ref={wrapperRef} className={styles["marquee-wrapper"]}>
        {items.map((item, index) => (
          <div
            key={index}
            className={styles["marquee-item"]}
            style={{
              ...(customItemStyle?.filter
                ? { filter: customItemStyle.filter }
                : {}),
              ...(customItemStyle?.borderRadius
                ? { borderRadius: customItemStyle.borderRadius }
                : {}),
              "--custom-height": customItemStyle?.height || "auto",
              "--custom-width": customItemStyle?.width || "auto",
              "--custom-padding": customItemStyle?.padding || "0 40px",
              "--custom-margin": customItemStyle?.margin || "0",
            } as React.CSSProperties}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeCarousel;
