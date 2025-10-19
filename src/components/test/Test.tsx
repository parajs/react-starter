
import { useEffect, useState } from "react"
import styles from "./Test.module.css"
import React from "react"
import { JSX } from "react/jsx-runtime"
import router from "@/router"



export const Header = () => {
    return <h2 className={styles.header}>AboutCard Header</h2>
}

export const Footer = () => {
    return <h2 className={styles.footer}>AboutCard Footer</h2>
}


export const Content = () => {
    return <div className={styles.content}>AboutCard Content</div>
}

export const Avatar = () => {
    return <div className={styles.avatar}>AboutCard Avatar</div>
}


export function ConditionalWrapper({ condition, children }: { condition: boolean; children: React.ReactNode }) {
  if (condition) {
    return <div className="wrapper">{children}</div>;
  }
  return children; // 直接返回children
}


export function DataProvider({ children }: { children: (data: any) => React.ReactNode }) {
  const [data, setData] = useState<{message: string} | null>(null);
  
  useEffect(() => {
    setTimeout(() => {
      setData({ message: "Hello from DataProvider!" });
    }, 2000);
  }, []);
  
  // children作为函数
  return children(data);
}

// 选项卡组件
export function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = React.Children.toArray(children);
  return (
    <div>
      <div className="tab-headers">
        {tabs.map((tab, index) => {
          let title: React.ReactNode = String(index + 1);
          if (React.isValidElement(tab) && tab.props && typeof tab.props === "object" && "title" in tab.props) {
            // safe to access props.title when it's a valid React element and has title
            // @ts-ignore - narrow to any to access title if present
            title = (tab.props as any).title;
          }
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={index === activeTab ? 'active' : ''}
            >
              {title}
            </button>
          );
        })}
      </div>
      <div className="tab-content">
        {tabs[activeTab]}
      </div>
    </div>
  );
}


// Tab组件
export function Tab({ title, children }: { title: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}




