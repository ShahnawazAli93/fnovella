package org.fnovella.project.grade.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.grade.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
	@Modifying
    @Transactional
    @Query("delete from Grade where location = ?1")
	void deleteByLocationId(Integer id);
	
	List<Grade> findByProgramId(Integer programId);
	@Modifying
    @Transactional
    @Query("delete from Grade where programId = ?1")
	void deleteByProgramId(Integer idProgram);
}