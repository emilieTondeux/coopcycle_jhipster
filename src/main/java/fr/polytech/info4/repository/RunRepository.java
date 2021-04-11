package fr.polytech.info4.repository;

import fr.polytech.info4.domain.Run;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Run entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RunRepository extends JpaRepository<Run, Long> {
}
