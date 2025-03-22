export default async function AboutPage() {
  return (
    <div className="h-screen bg-[#F9E9EC] flex flex-col font-arial text-[#577590]">
      <p className="m-4 text-2xl text-center font-bold">Who We Are
      </p>
      <p className="mx-8 my-4 text-left"> TaskSync started out as a software project for our Senior Capstone Class (at one point we wanted to call it Agenda Ninja, but that was scrapped for respectibility's sake).
        [Editor's Note: I still wanted it though :) ]
      </p>
      <p className="mx-7 my-4 text-left"> Anyway, we hope you and your team can get some use out of this project. 
      </p>
      <p className="mx-12 my-4 text-left">         Sincerely,
      </p>
      <p className="mx-10 text-left">Khoi Le
      </p>
      <p className="mx-10 text-left">Ryeleigh Avila
      </p>
      <p className="mx-10 text-left">Logan Herrera
      </p>
      <p className="mx-10 text-left">Anthony Cecchini
      </p>
      <p className="mx-8 my-4 text-left">p.s. Thank you to our instructor, Asaad Althoubi, for helping us out along the way.
      </p>
    </div>
  );
}
