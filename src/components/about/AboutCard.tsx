
import styles from "./AboutCard.module.css"

export default function AboutCard({ children }: { children?: React.ReactNode }) {
    return <div className={styles.card}>{children}</div>
}


