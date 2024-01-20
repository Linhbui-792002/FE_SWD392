import { Inter } from 'next/font/google'
import ListProduct from '@src/components/ProductList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ListProduct />
  )
}
