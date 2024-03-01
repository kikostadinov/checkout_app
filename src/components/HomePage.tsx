import { useGetAllProductsQuery } from "../features/productsApi";
import { IProduct } from "../interfaces";

export default function HomePage() {
  const { data, error, isLoading } = useGetAllProductsQuery({});

  console.log(data);
  const renderProducts = isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className="products">
      {data?.map((product: IProduct) => (
        <div className="product" key={product.id}>
          <h3>{product.title}</h3>
          <div className="img-wrapper">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="price">${product.price}</div>
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