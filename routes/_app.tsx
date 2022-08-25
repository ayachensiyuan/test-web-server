import Header from "../components/Header.tsx";
import MyBanner from "../components/MyBanner.tsx";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MyBanner />
      <div className="dark:bg-gray-800 dark:text-white">
      {children}
      </div>
    </>
  );
}
