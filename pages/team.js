import { useEffect } from "react";
import groq from "groq";
import { sanityClient } from "../sanity";
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
      <div className='grid-cols-1 grid gap-1 xl:gap-4 xl:grid-cols-2 xl:grid-flow-row lg:px-2'>
        {teamMembers.map((teamMember) => {
          return <TeamMember key={teamMember.name} {...teamMember} />;
        })}
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
    revalidate: 60,
  };
}

export default Team;
