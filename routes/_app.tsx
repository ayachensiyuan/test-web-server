import Header from "../components/Header.tsx";
import MyBanner from "../components/MyBanner.tsx";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MyBanner />
      <div >

      {children}
      </div>
    </>
  );
}
