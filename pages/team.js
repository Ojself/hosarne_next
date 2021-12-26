import { useState, useEffect } from "react";
import sanityClient from "../client";
import TeamMember from "../components/TeamMember";

import { changeLayOutColors } from "../utils/helpers";
const Team = () => {
  const [teamMember, setTeamMember] = useState([]);
  useEffect(() => {
    changeLayOutColors("#fff");

    const fetchSanityData = async () => {
      const data =
        await sanityClient.fetch(`*[_type == "human"] | order(order asc){
                       name,
                       title,
                       email,
                       mobile,
                       body,
                       image{
                           asset->{
                               _id,
                               order,
                               url
                           },
                           alt
                       }
                   }`);
      setTeamMember(data);
    };
    fetchSanityData();
  }, []);

  return (
    <main className='flex flex-col items-center'>
      <div className='mt-6 flex w-full px-2 lg:px-0 lg:w-2/3 flex-col'>
        {teamMember.map((human) => (
          <TeamMember key={human.name} {...human} />
        ))}
      </div>
    </main>
  );
};

export default Team;
