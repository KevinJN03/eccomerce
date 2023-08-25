import Footer_Copyright from "./footer_copyright";
import Section_1 from "./section_1";
import Section_2 from "./section_2";
import Section_3 from "./section_3";
function Footer() {
  return (
    <>
    <footer className="flex flex-col">
      <div className="flex flex-row gap-5 justify-center">
        <Section_1 />
        <Section_2 />
        <Section_3 />
      </div>
      {/* <Footer_Copyright /> */}
    </footer>
    
    </>
    
  )
}

export default Footer;
