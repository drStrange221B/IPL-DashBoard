package com.emrys.ipldashboard.data;

import com.emrys.ipldashboard.model.Team;
import org.hibernate.cfg.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private EntityManager em;

    @Autowired
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;

    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");





            Map<String, Team> teamData = em.createQuery("SELECT m.team1, count(*) FROM Match m group by m.team1", Object[].class)
                    .getResultList()
                    .stream()
                    .parallel()
                    .map(e -> new Team((String) e[0], (long) e[1]))
                    .collect(Collectors.toMap(team -> team.getTeamName(), Function.identity()));

            em.createQuery("SELECT m.team1, count(*) FROM Match m group by m.team1", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get(e[0]);
                        team.setTotalMatches(team.getTotalMatches() + (long) e[1]);

                    });

            em.createQuery("SELECT m.matchWinner, count(*) FROM Match m group by m.matchWinner", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(
                            e->{
                                Team team = teamData.get(e[0]);
                                team.setTotalWins((long)e[1]);

                            }
                    );

            teamData.values().forEach(System.out::println);

            teamData.values().forEach(team->em.persist(team));

        }
    }
}
