import NavBar from "../components/NavBar";
export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar></NavBar>
      <Component {...pageProps}></Component>
      <style jsx global>{`
        a {
          color: white;
        }
      `}</style>
    </>
  );
}
