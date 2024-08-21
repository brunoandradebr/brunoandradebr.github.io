import { useThemeStore } from "storage/theme";

interface IExperiment {
  title: string;
  description: string;
  img: string;
  platform: string[];
  link: string;
}

const experiments: IExperiment[] = [
  {
    title: "Flappy Bird",
    description: "Clone da mecânica do clássico flappy bird desenvolvido pelo vietnamita Dong Nguyen",
    img: "https://acobaia.io/EmagJS/Demos/5/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/5/",
  },
  {
    title: "Asteroids",
    description: "Clone do clássico dos arcades criado por Ed Logg e Lyle Rains",
    img: "https://acobaia.io/EmagJS/Demos/3/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/3/",
  },
  {
    title: "Pong",
    description: "Clone do clássico game da Atari criado por Nolan Bushnell e Ted Dabney",
    img: "https://acobaia.io/EmagJS/Demos/2/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/2/",
  },
  {
    title: "Cloth Simulation",
    description: "Simulação de tecido. Usando integração de Euler com apenas uma iteração no solver das constraints",
    img: "https://acobaia.io/EmagJS/Demos/4/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/4/",
  },
  {
    title: "Fruit Ninja",
    description: "Estudo da mecânica core do jogo fruit ninja desenvolvido pela Halfbrick Studios Pty Ltd",
    img: "https://acobaia.io/EmagJS/Demos/6/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/6/",
  },
  {
    title: "Raycasting Render",
    description: `Algoritmo de raycasting utilizado para renderizar "3D". Técnica popularizada por John Carmack no clássico Wolfenstein 3D de 1992.`,
    img: "https://acobaia.io/EmagJS/Demos/9/thumb.png",
    platform: ["mouse"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/9/",
  },
  {
    title: "A* Pathfinding",
    description:
      "Algoritmo que acha o caminho mais curto entre dois nós num grafo. Criado em 1968 por Peter Hart, Nils Nilsson e Bertram Raphael. Foi uma extensão do algoritmo de Edsger Dijkstra criado em 1956.",
    img: "https://acobaia.io/EmagJS/Demos/8/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/8/",
  },
  {
    title: "Chaikin Curve",
    description:
      "Implementação do algoritmo do matemático George Chaikin criado em 1974 para criação de curvas a partir de pontos de controle",
    img: "https://acobaia.io/EmagJS/Demos/7/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/7/",
  },
  {
    title: "Planarity",
    description: "Um protótipo baseado no famoso game em flash feito por John Tantalo",
    img: "https://acobaia.io/EmagJS/Demos/1/thumb.png",
    platform: ["mouse", "touch"],
    link: "https://brunoandradebr.github.io/EmagJS/Demos/1/",
  },
];

export const Experiments = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <div className="flex flex-col text-primary font-medium text-3xl">Experiments</div>
      <div className="text-base text-nowrap">
        all experiments are made with
        <a
          className="px-2 py-1 ml-1 rounded-xl text-sm bg-foreground"
          href="https://github.com/brunoandradebr/EmagJS"
          target="_blank"
        >
          EmagJS
          <img
            className={`ml-1 -mt-[12px] inline w-[12px] h-[12px] ${theme === "dark" && "invert"}`}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg=="
          />
        </a>
      </div>

      <div className="flex flex-row flex-wrap gap-5 mt-10">
        {experiments.map((experiment) => (
          <a
            key={experiment.title}
            href={experiment.link}
            target="_blank"
            className="group flex flex-col items-center justify-between max-w-[280px] gap-5 p-3 text-xl rounded-md cursor-pointer transition-colors border-2 border-transparent bg-foreground hover:border-primary hover:bg-foreground-hover shadow-md"
          >
            <img
              src={experiment.img}
              title={experiment.title}
              className="w-[270px] h-[188px] rounded-md grayscale group-hover:grayscale-0"
            />
            <div className="flex flex-col gap-1 flex-1">
              <div className="text-accent font-medium">{experiment.title}</div>

              <div className="text-base">{experiment.description}</div>

              <div className="flex items-end h-full gap-1 font-medium text-xs mt-5">
                {experiment.platform.map((platform, platformKey) => (
                  <div key={platformKey} className="rounded-md px-2 py-1 border border-neutral-700">
                    {platform}
                  </div>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};
