import { useEffect } from "react";
import sanityClient from "../client";
import TeamMember from "../components/TeamMember";

import { changeLayOutColors } from "../utils/helpers";
const Team = ({ teamMembers }) => {
  if (!teamMembers || !teamMembers.length) {
    return <div>loading...</div>;
  }

  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);

  return (
    <main className='flex flex-col items-center'>
      <div className='mt-6 flex w-full px-2 lg:px-0 lg:w-2/3 flex-col'>
        {teamMembers.map((teamMember) => (
          <TeamMember key={teamMember.name} {...teamMember} />
        ))}
      </div>
    </main>
  );
};

const query = groq`*[_type == "human"] | order(order asc){
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
                   }`;

export async function getStaticProps(context) {
  const teamMembers = await sanityClient.fetch(query);
  return {
    props: {
      teamMembers,
    },
  };
}

export default Team;
