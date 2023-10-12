import styles from './MenuSection.module.css'

type MenuSectionProps = {
    name: string;
    children: React.ReactNode;
};

const MenuSection = (props: MenuSectionProps) => {
  return (
    <div className={styles.menuSection}>
        <span>{props.name}</span>

        <div className={styles.menuSectionContent}>
            {props.children}
        </div>
    </div>
  )
}

export default MenuSection
