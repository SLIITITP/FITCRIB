import React, {useState} from "react";
import "../FNFaqPage/FNFaq.css";
const { speechSynthesis } = window;

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
  
    speechSynthesis.speak(utterance);
  };

export default function FAQ() {

    const [faqs, setfaqs] = useState([
        {
            question: 'How to create a transaction record?',
            answer: 'You can create a transaction record by clicking the create button on the finance dashboard or the create transaction on the header.'
        },
        {
            question: 'How can I view user payments?',
            answer: 'You can view user payments by clicking the view user payments button at the create transaction page.'
        },
        {
            question: 'Can I update a transaction record?',
            answer: 'Imesh gobbaya fuck you motherfucker'
        },
        {
            question: 'Can I delete a transaction record?',
            answer: 'Rashmika uba kathai ban apoooooo wadak na uba, ubata musthafa kiyanne nikanda? .'
        },
        {
            question: 'How to check whether the company is having a negative net profit?',
            answer: 'You can visit the financial performance page to check it or if you need to check performance of time period, you can use the calculations section.'
        },
        {
            question: 'Can any admin operate the financial management system?',
            answer: 'Yes, as long as the admin is logged into the system via the credentials they can.'
        }
    ]); 

    return (

        <div className="FNFaqPage">
            <h1 className="FNFAQHeading">FREQUENTLY ASKED QUESTIONS (FAQ's)</h1>

            {faqs.map((faq, index) => (
                <div key={index} className="FNFaqDiv">
                    <br/>
                    <h3 className="FNFaqQuestion">{faq.question}</h3>
                    <p className="FNFaqAnswer">---{faq.answer}</p>
                    <button className="FNFaqButton" onClick={() => speak(faq.answer)}>Read Aloud</button>
                </div>
                
            ))}
            <br/><br/>

        </div>
    )
}