import { React, useEffect, useState } from "react";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { useParams } from "react-router-dom";
import "./TeamPage.scss";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";

export const TeamPage = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState({ matches: [] });

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`
      );
      const data = await response.json();
      setTeam(data);
    };
    fetchMatches();
  }, [teamName]);

  if (!team || !team.teamName) {
    return <h1>Team not found</h1>;
  }
  // eslint-disable-next-line
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 class="team-name">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">
        Wins / Losses
        <PieChart
          data={[
            {
              title: "Wins",
              value: team.totalMatches - team.totalWins,
              color: "#a34d5d",
            },
            { title: "Losses", value: team.totalWins, color: "#4da375" },
          ]}
        />
      </div>
      <div className="match-detail-section">
        <h3>Latest Matches </h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map((match) => (
        <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />
      ))}

      <div className="more-link">
        <Link
          to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}
        >
          More>
        </Link>
      </div>
    </div>
  );
};
