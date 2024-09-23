import profile from './assets/profile.png'

export const Home = () => {
  return (
    <>
      <div className="flex flex-col uppercase font-medium text-2xl mb-5">
        <span className="text-3xl">Hello,</span>
        <span className="text-4xl">
          I Am <b className="text-primary">Bruno</b>
        </span>
      </div>
      <div className='text-2xl'>
        <img
          src={profile}
          title="Bruno Andrade"
          className="rounded-full [shape-outside:circle()] float-left w-[190px] p-3 sm:p-5 sm:w-[264px] sm:h-[264px]"
        />
        I am a brazilian frontend developer with recent expertise in React based application
        - about 5 years. <br />
        <br />
        I used to live in a time where frontend was not a nightmare like today, where every
        single day has a new library.
        <br />
        <br />
        I've been programming since 2008, where I first coded a "hello world" with
        Actionscript (flash ❤️) - learnt to code by myself.
        <br />
        <br />
        I've experienced all web transformations, since internet explorer 6!, browser
        environment those days was a hard task. Almost 15 years working with web development
        and still learning new skills like React, typescript, zustand, node, vite and all
        these new amazing technologies.
        <br />
        <br />
        I have some backend experience with the so loved and hated PHP as well. But in
        recent years I have been fully dedicated to the frontend area.
        <br />
        <br />
        I am passionate about game development, not engine development but
        from-scratch-development.
        <br />
        <br />
        This personal page is about my adventure in learning game dev core.
        <br />
        <br />
        Here you will find some prototypes made with javascript using canvas api.
        <br />
        <br />
        No engine, no frameworks, just like a psychopath 🤓
      </div>
    </>
  )
}
