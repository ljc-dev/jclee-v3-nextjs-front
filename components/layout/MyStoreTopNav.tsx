import Link from 'next/link'
import { useContext } from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai"
import DividerV from '../blog/DividerV'
import { StoreContext } from '../../hooks/StoreContext'
import { getTotalItems } from '../../utils/storeFns'

const MyStoreTopNav = () => {
  const { cart, setCart } = useContext(StoreContext) ?? {}
  const numCartItems = getTotalItems(cart)
  // console.log("numCartItems", numCartItems);

  return (
    <div className="mb-20 sm:mb-22 lg:mb-24">
      <div className="fixed top-0 z-40 inset-x-0 border-b bg-white">
        <nav className="relative px-4 max-w-screen-xl mx-auto py-3 lg:py-5">
          <div className="w-full flex items-center relative z-50">
            <div className="flex items-center">
              <Link href="/#"><a className="focus:outline-none leading-none text-2xl lg:text-3xl mr-4">JC LEE</a></Link>
              <DividerV className="h-6 border-gray-400" />
              <span className="ml-4 text-gray-800 text-sm">Store</span>
            </div>
            <div className="flex-1"></div>
            <div className="text-sm capitalize flex items-center flex-wrap font-semibold tracking-tight">
              <Link href="/store/checkout"><a className={`mr-3 md:mr-4 py-0.5 flex items-center`}>
                <span className="hidden sm:inline tracking-wide mr-2 ">Shopping Cart</span>
                <div className="relative">
                  <span className="sm:hidden sr-only">Shopping Cart</span>
                  <AiOutlineShoppingCart aria-hidden={true} className="w-8 h-8" />
                  <div className={`${numCartItems === 0 && "hidden"} absolute -top-1.5 -right-1.5 text-xs text-white bg-blue-800 rounded-full w-5 h-5 flex justify-center items-center`}>{numCartItems}</div>
                </div>
              </a></Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MyStoreTopNav