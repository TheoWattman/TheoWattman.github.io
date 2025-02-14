import backgroundImage from "./assets/Hero.png";
import portrait from "./assets/portrait.jpg";
import education from "./assets/education.svg";
import job from "./assets/job.svg";

import html from "./assets/languages/html-1.svg";
import css from "./assets/languages/css-3.svg";
import javascript from "./assets/languages/logo-javascript.svg";
import cpp from "./assets/languages/c.svg";
import python from "./assets/languages/python-5.svg";
import sql from "./assets/languages/sql-database-generic-svgrepo-com.svg";
import java from "./assets/languages/java-14.svg";

import docker from "./assets/tech/docker-4.svg";
import git from "./assets/tech/git.svg";
import ros from "./assets/tech/ROS.svg";
import monday from "./assets/tech/monday-1.svg";
import slack from "./assets/tech/slack.svg";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, useAnimation } from "framer-motion";
import CV from "./assets/CV.pdf";
import "./App.css";

const checkpoint = window.innerHeight * 0.7;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  var opacity;

  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
  } else {
    opacity = 0;
  }
  document.querySelector(".front").style.opacity = opacity;
});

const Card = ({children}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercent = mouseX / width - 0.5;
    const yPercent = mouseY / height - 0.5;
    
    x.set(xPercent);
    y.set(yPercent);
  }

  const handleMouseLeave = (e) => {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='w-fit h-fit p-5 border-2 border-pink-500 rounded-[10px]'
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}>
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          rotateX,
          rotateY
        }}>{children}</div>
    </motion.div>
  )
}

const Reveal = ({children}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  const mainControls = useAnimation();

  useEffect(() =>{
    if(isInView) {
      mainControls.start("visible")
    }
  }, [isInView]);

  return (
      <motion.div
      ref = {ref}
      variants={{ 
        hidden: {opacity: 0, y: 0},
        visible: {opacity: 1, y: 0}  
      }}
      initial="hidden"
      animate={mainControls}
      transition={{duration: 0.5, delay: 0.25}}

      >{children}</motion.div>
  )
}

function App() {

  const aboutRef = useRef(null);
  const expRef = useRef(null);
  const projRef = useRef(null);
  const conRef = useRef(null);

  return (
    <>
    <div className="w-screen h-screen block xl:hidden">
      <h1 className="relative m-auto top-4/10 text-white font-monument-bold text-[2vw] w-3/4">This website is best viewed on a desktop. A mobile-friendly version is coming soon!</h1>
    </div>

    <div className="hidden xl:block">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <header className='fixed w-screen text-l font-monument-regular text-white z-100'>
        <ul className='float-right pr-15 pt-5'>
          <li className="inline-block mr-4 hover:underline">
            <a href="#" onClick={(e) => {e.preventDefault(); aboutRef.current?.scrollIntoView({ behavior: "smooth"});}} className="text-white"><span className="text-pink-500 mr-1">0.1</span>About</a>
          </li>
          <li className="inline-block mr-4 hover:underline">
            <a href="" onClick={(e) => {e.preventDefault(); expRef.current?.scrollIntoView({ behavior: "smooth"});}} className="text-white"><span className="text-pink-500 mr-1">0.2</span>Experience</a>
          </li>
          <li className="inline-block mr-4 hover:underline">
            <a href="" onClick={(e) => {e.preventDefault(); projRef.current?.scrollIntoView({ behavior: "smooth"});}} className="text-white"><span className="text-pink-500 mr-1">0.3</span>Projects</a>
          </li>
          <li className="inline-block mr-4 hover:underline">
            <a href="" onClick={(e) => {e.preventDefault(); conRef.current?.scrollIntoView({ behavior: "smooth"});}} className="text-white"><span className="text-pink-500 mr-1">0.4</span>Contact</a>
          </li>
        </ul>
      </header>

      
      <section className=' w-screen h-screen'>
        <div className='absolute bottom-0 p-50 font-monument-bold text-white text-left'>
          <h1 className='text-[3vw]'>Theodor Wattman</h1>
          <h1 className='text-[1.5vw]'>Aspiring Software Developer</h1>
          <div className=''>
            <button onClick={(e) => {e.preventDefault(); conRef.current?.scrollIntoView({ behavior: "smooth"});}} className='hover:bg-pink-50 m-2 p-3 bg-white text-pink-500 rounded-md'>Get in touch!</button>
            <button onClick={()=> {window.open(CV, "_blank");}}className='hover:text-pink-50 m-2 p-3 rounded-md shadow-[inset_0_0_0_2px_rgba(255,255,255,1)]'>My Resume</button>
          </div>
        </div>
        <img src={backgroundImage} id="background-image" className='front fixed h-screen mx-auto object-cover' alt="" />
      </section>
      
      <Reveal>
      <section ref={aboutRef} id='about-section' className='w-screen h-screen content-center'>
        <div className='flex w-3/4 h-3/4 m-auto items-center'>

          <div className='w-1/2 h-fit text-left text-white'>
            <h1 className='font-monument-bold text-[1.5vw] text-pink-500'>About me</h1>
            <p className='font-monument-regular text-[0.8vw] my-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sapiente delectus illum dolorum blanditiis, nesciunt obcaecati quisquam quo, tempore molestiae ullam numquam possimus iste veniam at et vel, ad ut.
            </p>

            <h1 className='font-monument-bold text-[1vw] my-3 text-pink-500'>Skills & Tech</h1>
            <div className=' font-monument-regular'>
              <ul className='flex flex-wrap text-[0.8vw]'>
                <li><p className='flex items-center mx-2'>HTML <img src={html} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>CSS <img src={css} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>JavaScript <img src={javascript} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>C++ <img src={cpp} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>Java <img src={java} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>Python <img src={python} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>SQL <img src={sql} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>Docker <img src={docker} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>Git <img src={git} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>Monday <img src={monday} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>ROS <img src={ros} className='h-[1em] ml-2' alt="" /></p></li>
                <li><p className='flex items-center mx-2'>Slack <img src={slack} className='h-[1em] ml-2' alt="" /></p></li>
              </ul>
            </div>
          </div>
          
          <div className='w-1/2 h-full content-center'>
            <div className=' *:relative *:mx-auto *:translate-y-1/2 *:z-10'>
              <Card>
                <img src={portrait} alt="" className='w-[20vw] rounded-[10px] z-10' />
              </Card>
            </div>

            <div className='w-1/2 h-1/2 bg-pink-500 mx-auto rounded-[50%] blur-[150px] -translate-y-1/2 z-0'></div>
          </div>

        </div>
      </section>
      </Reveal>

      <section ref={expRef} id='experience-section' className='w-screen min-h-screen content-center text-white'>
      <h1 className='font-monument-bold text-[1.8vw] mb-[25px]'>Experience</h1>

        <div className='flex 2xl:w-[1400px] m-auto content-center flex-col'>
          <div className="w-1/2 h-1 bg-pink-500 m-auto 2xl:hidden"></div>

          <div className='absolute hidden 2xl:block right-1/2 h-full w-1 bg-pink-500'></div>
   
          <div className='w-1/2 h-1/5 my-[25px] mx-auto 2xl:mx-0'>
            <Reveal>
            <div className='w-full flex items-center text-2xl'>
              <p className='font-monument-regular float-right mr-auto'>Formula Student</p>
              <p className='font-monument-light text-[0.8vw]'>Aug. 2024 - Present</p>
              <div className='h-1 w-10 bg-pink-500 m-5 2xl:block hidden'></div>
              <div className="2xl:p-0 py-8"></div>
              <div className='float-right mr-4 w-16 h-16 rounded-4xl bg-pink-500 content-center 2xl:block hidden'>
                <img src={job} className='h-10 w-10 object-scale-down m-auto' alt="" />
              </div>
            </div>
            </Reveal>
            <Reveal>
            <p className='relative text-left font-monument-light text-[0.8vw] -top-4.5'>KTH</p>
            </Reveal>
            
            <Reveal>
            <p className='text-left font-monument-regular w-9/10 text-[0.8vw] relative -top-3 '>
              Develop and implement solutions for autonomous vehicle systems, focusing on sensor integration,
              path planning, and control strategies contributing to KTH Formula Student's self-driving race car in
              the world's largest student engineering competition.
            </p>
            </Reveal>

          </div>

          <div className="w-1/2 h-1 bg-pink-500 m-auto 2xl:hidden"></div>

          <div className='w-1/2 h-1/5 relative 2xl:left-1/2 my-[25px] mx-auto 2xl:mx-0'>
          <Reveal>
            <div className='w-full flex items-center text-2xl'>
              <div className="2xl:p-0 py-8"></div>
              <div className='float-right ml-4 w-16 h-16 rounded-4xl bg-pink-500 content-center 2xl:block hidden'>
                <img src={education} className='h-12 w-12 object-scale-down m-auto' alt="" />
              </div>
              <div className='h-1 w-10 bg-pink-500 m-5 2xl:block hidden'></div>

              <p className='font-monument-regular float-right'>KTH</p>
              <p className='font-monument-light text-[0.8vw] ml-auto'>Aug. 2023 - Present</p>
            </div>
            </Reveal>
            <Reveal>
            <p className='relative 2xl:ml-40 ml-0 text-left font-monument-light text-[0.8vw] -top-4.5'>Information and Communication Technology</p>
            </Reveal>
          </div>

          <div className="w-1/2 h-1 bg-pink-500 m-auto 2xl:hidden"></div>

          <div className='w-1/2 h-1/5 my-[25px] mx-auto 2xl:mx-0'>
            <Reveal>
            <div className='w-full flex items-center text-2xl'>
              <p className='font-monument-regular float-right mr-auto'>Tutor</p>
              <p className='font-monument-light text-[0.8vw]'>Jan. 2020 - Jun. 2023</p> 
              <div className="2xl:p-0 py-8"></div>
              <div className='h-1 w-10 bg-pink-500  mx-5 2xl:block hidden'></div>
              <div className='float-right mr-4 w-16 h-16 rounded-4xl bg-pink-500 content-center 2xl:block hidden'>
                <img src={job} className='h-10 w-10 object-scale-down mx-auto' alt="" />
              </div>
            </div>
            </Reveal>
            <Reveal>
            <p className='relative text-left font-monument-light text-[0.8vw] -top-4.5'>Self-employed</p>
            </Reveal>
            <Reveal>
            <p className='text-left font-monument-regular w-9/10 text-[0.8vw] relative -top-3 '>
              Helped students in grade 9 reach their goals in mathematics. This was done through physical
              lessons in the students’ homes
            </p>
            </Reveal>
          </div>

          <div className="w-1/2 h-1 bg-pink-500 m-auto 2xl:hidden"></div>

          <div className='w-1/2 h-1/5 relative 2xl:left-1/2 my-[25px] mx-auto 2xl:mx-0'>
            <Reveal>
            <div className='w-full flex items-center text-2xl'>
            <div className="2xl:p-0 py-8"></div>
              <div className='float-right ml-4 w-16 h-16 rounded-4xl bg-pink-500 content-center 2xl:block hidden'>
                <img src={education} className='h-12 w-12 object-scale-down m-auto' alt="" />
              </div>
              <div className='h-1 w-10 bg-pink-500 m-5 2xl:block hidden'></div>

              <p className='font-monument-regular float-right'>Åva Gymnasium</p>
              <p className='font-monument-light text-[0.8vw] ml-auto'>Aug. 2020 - Jun. 2023</p>
            </div>
            </Reveal>
            <Reveal>
            <p className='relative ml-40 text-left font-monument-light text-[0.8vw] -top-4.5'>Information and Media Technology</p>
            </Reveal>
          </div>
          
          <div className="w-1/2 h-1 bg-pink-500 m-auto 2xl:hidden"></div>

          <div className='w-1/2 h-1/5 my-[25px] mx-auto 2xl:mx-0'>
            <Reveal>
            <div className='w-full flex items-center text-2xl'>
              <p className='font-monument-regular float-right mr-auto'>IEST</p>
              <p className='font-monument-light text-[0.8vw]'>Aug. 2015 - Jun. 2020</p>
              <div className="2xl:p-0 py-8"></div>
              <div className='h-1 w-10 bg-pink-500 m-5 2xl:block hidden'></div>
              <div className='float-right mr-4 w-16 h-16 rounded-4xl bg-pink-500 content-center 2xl:block hidden'>
                <img src={education} className='h-12 w-12 object-scale-down m-auto' alt="" />
              </div>
            </div>
            </Reveal>
            <Reveal>
            <p className='relative text-left font-monument-light text-[0.8vw] -top-4.5'>International English School Täby</p>
            </Reveal>
          </div>

        </div>
      </section>

      <Reveal>
      <section ref={projRef} id='projects-section' className='w-screen h-screen content-center text-white'>
        <h1 className='font-monument-bold text-[1.8vw]'>Projects:</h1>
        <div className='w-3/4 h-3/4 m-auto flex flex-wrap justify-center items-center *:m-5'>
        <Card>
          <div className='w-[20vw] h-[20vw] bg-[#1c1c1c] rounded-[20px] overflow-hidden'>
            <h1 className='absolute font-monument-bold right-1/2 translate-1/2 '>Raytracer</h1>
            <img src={backgroundImage} alt="" />
            <p className='font-monument-light text-left p-2 text-[0.8vw]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur cum enim nemo molestiae beatae? Accusamus eveniet velit explicabo saepe excepturi.</p>
          </div>
        </Card>
        <Card>
          <div className='w-[20vw] h-[20vw] bg-[#1c1c1c] rounded-[20px] overflow-hidden'>
            <h1 className='absolute font-monument-bold right-1/2 translate-1/2 '>Raytracer</h1>
            <img src={backgroundImage} alt="" />
            <p className='font-monument-light text-left p-2 text-[0.8vw]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur cum enim nemo molestiae beatae? Accusamus eveniet velit explicabo saepe excepturi.</p>
          </div>
        </Card>

        <Card>
          <div className='w-[20vw] h-[20vw] bg-[#1c1c1c] rounded-[20px] overflow-hidden'>
            <h1 className='absolute font-monument-bold right-1/2 translate-1/2 '>Raytracer</h1>
            <img src={backgroundImage} alt="" />
            <p className='font-monument-light text-left p-2 text-[0.8vw]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur cum enim nemo molestiae beatae? Accusamus eveniet velit explicabo saepe excepturi.</p>
          </div>
        </Card>
        <div className='w-1/4 aspect-square bg-pink-500 mx-auto rounded-[50%] blur-[350px] absolute -z-1'></div>
        </div>
        
      </section>
      </Reveal>
      <Reveal>
      <section ref={conRef} id='contact-section' className='w-screen h-screen content-center text-white'>
        <div className='m-auto w-1/4 h-1/4'>
          <h1 className='font-monument-bold text-[1.8vw] m-10'>Contact Me!</h1>
          <form action="" method='POST' className='flex-col flex border-2 border-pink-500 m-auto text-left w-full'>
            <label htmlFor="email" className='mx-5 mt-5'>Email</label>
            <input type="email" name='email' placeholder='Your email' className='mx-5 mb-5'/>
            <label htmlFor="subject" className='mx-5'>Subject</label>
            <input type="text" name='subject' placeholder='Subject' className='mx-5 mb-5'/>
            <label htmlFor="message" className='mx-5'>Message</label>
            <textarea name="message" placeholder="Type your message" className='mx-5' required></textarea>
            <button type="submit" className='m-auto my-5 border-pink-500 border-1 p-2 rounded-[10px] w-1/4'>Send</button> 
          </form>
        </div>
      </section>
      </Reveal>
    </div>


    </>
  )
}

export default App
