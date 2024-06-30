"use client"
import { useState } from 'react';
import { 
  GoogleGenerativeAI ,
} from "@google/generative-ai";

import { Audio } from 'react-loader-spinner'
import LessonContent from '@/components/LessonContent';


// DEFINING THE MODEL NAME AND ACCESSING THE API KEY
const MODEL_NAME = "gemini-1.5-flash"
const GEMINI_API_KEY = "AIzaSyA528j4h-IjEWV72ADCBubanYEjD5qnd84";

export default function Home() {

    // STATE VARIABLES TO HANDLE USER INPUT, LLM RESPONSE AND LOADING STATE
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false)



    // FUNCTION TO SEND USER INPUT TO GEMINI AND GET BACK A RESPONSE
    async function run() {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

      const promptPrefix = `
      You are a teachers assistant, your job is to help teachers create a fun, interactive and well structured lesson plans for students with the following subheadings given below:
        ● Learning Objectives
        ● Materials Needed
        ● Lesson Procedure
        ● Assessment
        ● Differentiation . Format the output as a json array , each element should have a title and content property.
        Generate a lesson plan for the following topic:\n
      `
      const finalPrompt = promptPrefix + prompt
      const result = await model.generateContentStream(finalPrompt);
      const response = await result.response;
      const text = response.text();
      const responseContent = text;

      console.log(0)

      // FORMATTING RESPONSE TO JSON OBJECT 
      let formattedJson = responseContent.slice(7,responseContent.length-3)
      formattedJson = formattedJson.replace(/u?'(.+?)': u?'(.+?)'/g, '"$1":"$2"');

      formattedJson = (JSON.parse(formattedJson))

      // SETTING STATE VARIABLE TO THE RESPONSE FROM GEMINI
      setResponse(formattedJson)
    }

    

    // FUNCTION TO HANDLE FORM SUBMISSION
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          setLoading(true);
          await run();
          setLoading(false);
        } catch (error) {
          console.error('Error fetching response:', error);
        }
      };

    return (

      <div className='flex flex-col bg-gray-950 w-full h-screen items-center justify-center'>

          <div className=''>

            <h1 className="mt-24 text-4xl text-center font-semibold bg-gradient-to-r from-pink-200 from-10% via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              YOUR AI POWERED LESSON <br></br> PLANNER
            </h1>

            <h3 className='text-white text-xs font-light mt-6 text-center'>
            generate a fully structured study plan with AI
            </h3>
          
            <form onSubmit={handleSubmit}>

              <div className='flex flex-row max-sm:items-center max-sm:justify-center max-sm:space-x-1 space-x-3 mt-12'>
                <input
                    className='focus:outline-none max-sm:w-2/4 text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-gray-800 border-0'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                />

                <button className='bg-sky-400 hover:bg-sky-300 py-2 w-1/4 rounded focus:outline-none focus:shadow-outline'>

                  <h1 className='text-black'>
                    Submit
                  </h1>
                </button>

                </div>
            </form>

          </div>


          { loading ? 

                <div className='mt-6'>
                <Audio
                  height="80"
                  width="80"
                  radius="9"
                  color="blue"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                /> 
                </div>
                :
          
            response.length > 0 ? 
            <LessonContent items={response}/>

            : <div className='w-3/4 h-full mt-6 rounded-lg border border-gray-600 ml-10 mr-10'>
              </div>
          

        }
      </div>

    );
}
