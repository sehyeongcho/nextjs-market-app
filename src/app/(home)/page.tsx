/**
 * 누구나 열람할 수 있는 페이지를 정의하는 파일입니다.
 */

import Container from "@/components/Container"
import getProducts, { ProductsParams } from "../actions/getProducts"
import EmptyState from "@/components/EmptyState"
import ProductCard from "@/components/products/ProductCard"
import getCurrentUser from "../actions/getCurrentUser"
import FloatingButton from "@/components/FloatingButton"
import Categories from "@/components/categories/Categories"
import Pagination from "@/components/Pagination"
import { PRODUCTS_PER_PAGE } from "@/constants"

interface HomeProps {
  searchParams: ProductsParams
}

export const dynamic = 'force-dynamic'

export default async function Home(
  { searchParams }: HomeProps // 서버 컴포넌트에서 URL 파라미터를 받아오고 싶다면 page.tsx 파일에서 props로 searchParams를 받아오면 됩니다.
) {
  const products = await getProducts(searchParams) // URL 파라미터가 존재하지 않으면 특별한 조건이 없으므로 Product 테이블의 모든 데이터를 가져오게 됩니다.
  const currentUser = await getCurrentUser()

  const page = searchParams?.page
  const pageNum = typeof page === 'string' ? Number(page) : 1

  return (
    <Container>
      <Categories />
      {
        products?.data.length === 0
          ?
          <>
            <EmptyState showReset />

            {/* FloatingButton */}
            <FloatingButton href="/products/upload">
              +
            </FloatingButton>
          </>
          :
          <>
            <div
              className="
                grid
                grid-cols-1
                gap-8
                pt-12
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
              "
            >
              {products?.data.map((product) => (
                <ProductCard
                  currentUser={currentUser}
                  key={product.id}
                  data={product}
                />
              ))}
            </div>

            <Pagination
              page={pageNum}
              totalItems={products.totalItems}
              perPage={PRODUCTS_PER_PAGE}
            />

            {/* FloatingButton */}
            <FloatingButton href="/products/upload">
              +
            </FloatingButton>
          </>
      }

    </Container>
  )
}
