import EmailIcon from "../../../../assets/login-page/email.svg";
import PhoneIcon from "../../../../assets/login-page/phone.svg";
import WalletIcon from "../../../../assets/login-page/wallet.svg";
import MetamaskIcon from "../../../../assets/login-page/order-claim/metamask-icon.png";
import EmailInput from "../inputs/EmailInput";
import PhoneInput from "../inputs/NumberInput";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import config from "../../../../config.json";
import conABI from "../../../../abi/abi.json";
import { ethers } from "ethers";
import { redirect, useNavigate } from "react-router-dom";
import udIcon from "../../../../assets/ud-square-logo.png";
import topLogo from "../../../../assets/ud-logo.png";
const LoginForm = ({
  setProceedTo,
  setsigner,
  setwalletaddress,
  setcontract,
  setUser,
  user,
  log,
  setNav,
}) => {
  //function to initialise and declare variables
  const navigate = useNavigate();
  const [openEmail, setOpenEmail] = useState(true);
  const [openPhone, setOpenPhone] = useState(false);

  useEffect(() => {
    setNav("2");
  }, []);

  // Get the query parameter string
  const queryString = window.location.search;

  //function to connect to BNB network
  async function getAccount() {
    //setting the states of phone and email
    setOpenPhone(false);
    setOpenEmail(false);

    try {

      // BNB TESTNET REQUEST FOR ACCOUNTS ... TO CONNECT TO METAMASK
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
    } catch (switchError) {
      var next = 97;
      // This error code indicates that the chain has not been added to MetaMask.{Uncomment to use}
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + next.toString(16),
                chainName: "Smart Chain - Testnet",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                rpcUrls: [
                  "https://data-seed-prebsc-1-s1.binance.org:8545/",
                ] /* ... */,
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
    }

    // try {
    //   // BNB MAINNET REQUEST FOR ACCOUNTS ... TO CONNECT TO METAMASK
    //   await window.ethereum.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [{ chainId: "0x38" }],
    //   });
    // } catch (switchError) {
    //   var next = 56;
    //   // This error code indicates that the chain has not been added to MetaMask.{Uncomment to use}
    //   if (switchError.code === 4902) {
    //     try {
    //       await window.ethereum.request({
    //         method: "wallet_addEthereumChain",
    //         params: [
    //           {
    //             chainId: "0x" + next.toString(16),
    //             chainName: "BNB Smart Chain",
    //             nativeCurrency: {
    //               name: "BNB",
    //               symbol: "BNB",
    //               decimals: 18,
    //             },
    //             rpcUrls: ["https://bsc-dataseed.binance.org/"] /* ... */,
    //           },
    //         ],
    //       });
    //     } catch (addError) {
    //       console.log(addError);
    //     }
    //   }
    // }
    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log(provider);

    //This is used to acces the checked in accounts
    provider
      .getSigner()
      .then(async (res) => {
        var walletaddress = res.address;

        console.log(walletaddress);
        setwalletaddress(walletaddress);
        setsigner(res);
        console.log(JSON.stringify(res));

        const contract = new ethers.Contract(config.address_nft, conABI, res);
        setcontract(contract);

        setUser({ isLoggedIn: true, email: "", phoneNumber: "" });

        if (setProceedTo) {
          log ? navigate("/selection-page") : navigate("/login");
        } else {
          log ? navigate("/selection-page") : navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="loginWrapper"
      style={{ textAlign: setProceedTo ? "left" : "center" }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "4rem" }}
      >
        <img src={udIcon} style={{ width: "50px", height: "50px" }} />
      </div>
      <h2 style={{ textAlign: "center" }}>{log ? "Sign up" : "Log in"}</h2>
      <p style={{ textAlign: "center", marginTop: "-10px" }}>
        {log
          ? "Get started with your web3 phone number"
          : "Welcome back to Ultimate digits"}
      </p>

      {openEmail ? (
        <EmailInput setProceedTo={setProceedTo} user={user} log={log} />
      ) : (
        <button
          className="loginWrapperTranspBtn"
          onClick={() => {
            setOpenEmail(true);
            setOpenPhone(false);
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={EmailIcon} />
          Sign up with email
        </button>
      )}

      {openPhone ? (
        <PhoneInput
          setProceedTo={setProceedTo}
          openEmail={openEmail}
          user={user}
          log={log}
        />
      ) : (
        <div>
          {openEmail ? "" : <br />}
          <button
            className="loginWrapperTranspBtn"
            onClick={() => {
              setOpenPhone(true);
              setOpenEmail(false);
            }}
            style={{
              cursor: "pointer",
              marginTop: "-20px",
              marginBottom: "30px",
            }}
          >
            <img src={PhoneIcon} />
            Sign up with Phone Number
          </button>
        </div>
      )}
      <div className="emailInputBottomLine">
        <div />
        OR
        <div />
      </div>
      <div className="loginHeading" style={{ textAlign: "center" }}>
        Sign up with your wallet
      </div>
      <br />
      <button
        className="loginWrapperTranspBtn"
        onClick={getAccount}
        style={{ marginTop: "-45px" }}
      >
        <img src={MetamaskIcon} />
        Sign up with Metamask
      </button>
    </div>
  );
};

export default LoginForm;
