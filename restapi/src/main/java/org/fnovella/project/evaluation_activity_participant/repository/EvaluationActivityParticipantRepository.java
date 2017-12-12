package org.fnovella.project.evaluation_activity_participant.repository;

import org.fnovella.project.evaluation_activity_participant.model.EvaluationActivityParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface EvaluationActivityParticipantRepository extends JpaRepository<EvaluationActivityParticipant, Integer> {
    @Transactional
    void deleteByActivity(Integer activityId);
}