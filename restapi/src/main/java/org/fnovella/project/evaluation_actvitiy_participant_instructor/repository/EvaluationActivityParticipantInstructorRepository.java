package org.fnovella.project.evaluation_actvitiy_participant_instructor.repository;

import org.fnovella.project.evaluation_actvitiy_participant_instructor.model.EvaluationActivityParticipantInstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationActivityParticipantInstructorRepository extends JpaRepository<EvaluationActivityParticipantInstructor, Integer> {

    void deleteByActivity(Integer activityId);
}
