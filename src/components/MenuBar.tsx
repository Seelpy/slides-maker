import styles from './MenuBar.module.css'
import MenuSection from '../components/MenuSection'

const MenuBar = () => {
  return (
    <div className={styles.menuBar}>
      <MenuSection name='Section1'>
        <button>Save</button>
        <button>Load</button>
      </MenuSection>
      <MenuSection name='Section2'>
        <div>
          <button>Circle</button>
          <button>Triangle</button>
          <button>Square</button>
        </div>
        <div>
          <button>Ellipse</button>
          <button>Triangle</button>
          <button>Square</button>
          <button>Ellipse</button>
          <button>Triangle</button>
          <button>Square</button>
          <button>Ellipse</button>
        </div>
      </MenuSection>
    </div>
  )
}

export default MenuBar
