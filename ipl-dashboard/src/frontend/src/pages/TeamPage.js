import {React, useEffect } from 'react';
import {MatchDetailCard} from '../components/MatchDetailCard';
import {MatchSmallCard}  from '../components/MatchSmallCard';

export const TeamPage = () => {

  useEffect(

    
    () => {
      const fetchMatches = async () => {
        const response = await fetch('http://localhost:8080/team/Chennai%20Super%20Kings');
        const data = await response.json();
        console.log(data);
      };
      fetchMatches();
      
    }

    
  );

  

  return (
    <div className="TeamPage">
      <h1>Team Name</h1>
      <MatchDetailCard/>
      <MatchSmallCard/>
      <MatchSmallCard/>
      <MatchSmallCard/>
    </div>
  );
}


