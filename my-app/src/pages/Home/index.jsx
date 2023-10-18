import "../../styles/index.css";
import FeatureItem from "../../components/FeatureItem";
import NavBar from "../../components/NavBar";
import HeroContent from "../../components/HeroContent";
// import { useDispatch, useSelector } from 'react-redux'
// import * as themeActions from '../../features/theme'

const LOGO = require("../../assets/argentBankLogo.png");
const CHATICON = require("../../assets/icon-chat.png");
const MONEYICON = require("../../assets/icon-money.png");
const SECURITYICON = require("../../assets/icon-security.png");

function Home() {
  // const dispatch = useDispatch()
  // const theme = useSelector((state) => state.theme.darkMode)
  
  return (
    <div className="home">
      <NavBar src={LOGO} />
      {/* <div style={{ backgroundColor: theme ? "black" : "white", padding:"10px"}}>
      <h4>{theme ? "Dark" : "Light"} Theme</h4>
        <button  onClick={() => dispatch(themeActions.toggle())}>
          Changer de theme
        </button>
      </div> */}
      <main>
        <HeroContent />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem
            src={CHATICON}
            h3="You are our #1 priority"
            p="Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem
            src={MONEYICON}
            h3="More savings means higher rates"
            p="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem
            src={SECURITYICON}
            h3="Security you can trust"
            p="We use top of the line encryption to make sure your data and money
              is always safe."
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
