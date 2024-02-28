import { useGetAllProductsQuery } from "../features/productsApi";
import { IProduct } from "../interfaces";

export default function HomePage() {
  const { data, error, isLoading } = useGetAllProductsQuery({});

  const renderProducts = isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className="products">
      {data?.map((product: IProduct) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="home-page">
      <h2>All Products</h2>
      {renderProducts}
    </div>
  )
}