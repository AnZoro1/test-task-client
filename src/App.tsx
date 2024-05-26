import Products from "./modules/Products/components/Products"
import styles from './App.module.scss'
import { useState, useRef, ChangeEvent, useEffect } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import PricePlans from "./modules/PricePlans/components/PricePlans"
import Pages from "./modules/Pages/components/Pages"
import searchIcon from '../src/assets/icons/searchIcon.svg'
import closeIcon from '../src/assets/icons/closeIcon.png'
import filterIcon from '../src/assets/icons/filterIcon.png'


function App() {

  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('')
  const [modal, setModal] = useState(false)
  const [renderData, setRenderData] = useState('products')

  const selectRef = useRef<HTMLSelectElement>(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleActive = (e: ChangeEvent<HTMLSelectElement>) => {
    setActive(e.target.value)
  }

  const resetSelect = () => {
    if (selectRef.current) {
      selectRef.current.value = 'all'
    }
    setActive('all')
  }

  const handleRenderData = (e: ChangeEvent<HTMLSelectElement>) => {
    setRenderData(e.target.value)

  }

  useEffect(() => {
    if (renderData === 'products') {
      navigate('/products')
    } else if (renderData === 'pricePlans') {
      navigate('/pricePlans')
    } else if (renderData === 'pages') {
      navigate('/pages')
    }
  }, [renderData, navigate])


  return (
    <div className={`${styles.mainContainer} ${modal ? styles.mainContainerWithModal : ''}`} onClick={() => setModal(false)}>
      <div>
        <header>
          <div className={styles.inputSelectCont}>
            <div className={styles.inputContainer}>
              <input className={styles.searcInput} type="text" onChange={handleSearch} placeholder="Search" />
              <img src={searchIcon} alt="" />
            </div>
            <div className={styles.selectContainer}>
              <select className={styles.select} ref={selectRef} name="select" value={active} onChange={handleActive}>
                <option value="all">All</option>
                <option value="Active" >Active</option>
              </select>
              <img src={closeIcon} alt="" onClick={resetSelect} />
            </div>
          </div>
          <div className={styles.filterContainer}>
            <img src={filterIcon} alt="" />
            <select className={styles.filter} name="selectData" id="" value={renderData} onChange={handleRenderData}>
              <option value="products">products</option>
              <option value="pricePlans">pricePlans</option>
              <option value="pages">pages</option>
            </select>
          </div>


        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="products" element={<Products search={search} active={active} modal={modal} setModal={setModal} />} />
            <Route path="pricePlans" element={<PricePlans search={search} active={active} modal={modal} setModal={setModal} />} />
            <Route path="pages" element={<Pages search={search} active={active} modal={modal} setModal={setModal} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}


export default App
