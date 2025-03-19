import { currentUser } from "@clerk/nextjs/server";

export default async function AboutPage() {
  const user = await currentUser();

  if (!user) {
    return <div>Please sign in</div>;
  }
console.log('user is',user);
  return (
    <div>
      <p> TaskSync started out as a software project for our Senior Capstone Class (at one point we wanted to call it Agenda Ninja, but that was scrapped for respectibility's sake). <br></br>
        [Editor's Note: I still wanted it though :) ] <br></br>
        Anyway, we hope your team can get some use out of this project. <br></br>
        <br></br>
           Sincerely,<br></br>
        Khoi Le<br></br>
        Ryeleigh Avila<br></br>
        Logan Herrera<br></br>
        Anthony Cecchini<br></br>
        <br></br>
        p.s. Thank you to our instructor, Asaad Althoubi, for helping us out along the way.<br></br>
        </p>
    </div>
  );
}
