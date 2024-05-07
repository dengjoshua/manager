import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

function CreateAccountOptions() {
  return (
    <div className="content">
      <h1
        tabIndex="-1"
        id="createAccountOptionsTitle"
        className="text-2xl font-bold mb-4"
      >
        Let's get started!
      </h1>
      <p id="createAccountOptionsContent" className="mb-6">
        Welcome to Common App! Please tell us how you will use the system so we
        can prepare your account. If you are unsure, we encourage you to explore
        each option before you continue.
      </p>
      <p className="mb-6">
        Already have an account?{" "}
        <a id="createAccountLoginLink" href="/login" className="text-blue-500">
          Go to the login page.
        </a>
      </p>
    </div>
  );
}

function CreateAccountType({ type, index }) {
  return (
    <div className="create-account__type mb-4">
      <button
        className="button--primary bg-blue-500 text-white px-4 py-2 rounded-full mr-2"
        id={`createAccount${index}`}
      >
        <span className="cdk-visually-hidden">Create </span>
        {type}
        <span className="cdk-visually-hidden"> account</span>
      </button>
      <button
        className="button--icon bg-gray-200 text-gray-600 px-3 py-2 rounded-full"
        id={`createAccountInfo${index}`}
      >
        <FaQuestionCircle focusable="false" className="w-5 h-5 fill-current" />
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer role="contentinfo" className="public__footer bg-gray-100 py-8 mt-8">
      <ul className="flex flex-wrap justify-center mb-8">
        <li className="mr-4">
          <a
            href="https://appsupport.commonapp.org/"
            id="footerHelpLink"
            target="_blank"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Need help? Applicant solutions center opens in new tab"
          >
            Need Help?
          </a>
        </li>
        <li className="mr-4">
          <a
            href="https://appsupport.commonapp.org/applicantsupport/s/article/What-are-the-System-Requirements-to-use-The-Common-Application"
            id="footerSystemReqLink"
            target="_blank"
            className="text-gray-600 hover:text-blue-500"
            aria-label="System requirements, Opens in new tab"
          >
            {" "}
            System Requirements
          </a>
        </li>
        <li className="mr-4">
          <a
            href="https://appsupport.commonapp.org/applicantsupport/s/article/How-does-the-Common-App-address-accessibility"
            id="footerA11yLink"
            target="_blank"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Accessibility Information, Opens in new tab"
          >
            Accessibility Information
          </a>
        </li>
        <li className="mr-4">
          <a
            href="https://www.commonapp.org/terms-of-use"
            id="footerTOULink"
            target="_blank"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Terms of use, Opens in new tab"
          >
            Terms of Use
          </a>
        </li>
        <li className="mr-4">
          <a
            href="https://www.commonapp.org/files/Common-App-Fraud-Policy.pdf"
            id="footerFraudLink"
            target="_blank"
            className="text-gray-600 hover:text-blue-500"
          >
            Fraud policy{" "}
            <span className="cdk-visually-hidden">, Opens in new tab</span>
          </a>
        </li>
        <li>
          <a
            id="privacypolicy"
            href="https://www.commonapp.org/privacy-policy"
            target="_blank"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Privacy policy, Opens in new tab"
          >
            Privacy policy
          </a>
        </li>
      </ul>
      <p id="copyright" className="text-center text-gray-600">
        &copy; 2024 Common App
      </p>
      <div className="illustrations flex justify-center mt-8">
        <img
          src="shared-assets/images/illustration-bike.svg"
          alt=""
          className="illustrations__bike w-32 h-32"
        />
        <img
          src="shared-assets/images/illustration-clocktower.svg"
          alt=""
          className="illustrations__clocktower w-32 h-32"
        />
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <header role="banner" className="public__header bg-gray-100 py-4">
        <a
          href="https://www.commonapp.org/"
          id="caLogo"
          className="public__logo"
        >
          <img
            src="shared-assets/images/ca-logo-reversed.svg"
            alt="Common App"
          />
        </a>
      </header>
      <main role="main" className="public__content px-4">
        <CreateAccountOptions />
        <div className="create-account__types">
          <CreateAccountType type="First year student" index={0} />
          <CreateAccountType type="Transfer student" index={1} />
          <CreateAccountType type="Education professional" index={2} />
          <CreateAccountType type="Parent or other adult" index={3} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
