import styles from './MenuBar.module.css'
import MenuSection from '../components/MenuSection'
import Button from './Button'
import ColorButton from './ColorButton'

const MenuBar = () => {
  return (
    <div className={styles.menuBar}>
      <MenuSection name='Figures'>
        <div>
          <Button width='2.5rem' height='2.5rem'>
            <i className="fa-solid fa-circle fa-2xl" style={{color: `#4c88f0`}}/>
          </Button>

          <Button width='2.5rem' height='2.5rem'>
            <i className="fa-solid fa-square fa-2xl" style={{color: `#4c88f0`}}/>
          </Button>
        </div>

        <div>
          <Button width='2.5rem' height='2.5rem'>
            <i className="fa-solid fa-caret-up fa-2xl" style={{color: `#4c88f0`}}/>
          </Button>
        </div>
      </MenuSection>

      <MenuSection name='Text'>
        <div>
          Font:
          <select>
            <option value="Arial" selected>Arial</option>
            <option value="Verdana" selected>Verdana</option>
            <option value="Tahoma" selected>Tahoma</option>
            <option value="Trebuchet MS" selected>Trebuchet MS</option>
            <option value="Times New Roman" selected>Times New Roman</option>
            <option value="Georgia" selected>Georgia</option>
            <option value="Garamond" selected>Garamond</option>
            <option value="Courier New" selected>Courier New</option>
            <option value="Brush Script MT" selected>Brush Script MT</option>
          </select>

          Size:
          <input type="number" defaultValue={14} style={{width: `2.5rem`}}/>
        </div>

        <div>
          <Button> <i className="fa-solid fa-plus" style={{color: `#4c88f0`}}/> New Text </Button>
          <Button> <em>italic</em> </Button>
          <Button> <strong>Bold</strong> </Button>
        </div>
      </MenuSection>

      <MenuSection name='Images'>
        <div>
          <Button>
            <i className="fa-solid fa-file-image" style={{color: `#4c88f0`, fontSize: `1.5rem`}}/> <br/>
            Upload <br/>
            Image
          </Button>
        </div>
      </MenuSection>

      <MenuSection name='Colors'>
        <div>
          <Button>
            <i className="fa-solid fa-square" style={{color: `yellow`, fontSize: `1.5rem`}}/> <br/>
            Color 1
          </Button> 
          <Button>
            <i className="fa-solid fa-square" style={{color: `black`, fontSize: `1.5rem`}}/> <br/>
            Color 2
          </Button> 

          <div style={{display: `flex`, flexDirection: `column`}}>
            <div>
              <ColorButton color='red' />
              <ColorButton color='blue' />
              <ColorButton color='cyan' />
            </div>
            <div>
              <ColorButton color='red' />
              <ColorButton color='blue' />
              <ColorButton color='cyan' />
            </div>
          </div>

          <Button>
            <i className="fa-solid fa-palette " style={{color: `#4c88f0`, fontSize: `1.5rem`}}/> <br/>
            Edit
          </Button> 
        </div>
      </MenuSection>
    </div>
  )
}

export default MenuBar
