import {React} from 'react';

export const MatchDetailCard = ({ match }) => {
  
  if (match === null)
  {
    return null;
    }
  return (
    <div className="MatchDetailCard">
      <h3>Latest Matches </h3>
      <h4>{match.team1} VS {match.team2}</h4>
    </div>
  );
}


