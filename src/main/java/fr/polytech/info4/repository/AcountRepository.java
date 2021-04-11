package fr.polytech.info4.repository;

import fr.polytech.info4.domain.Acount;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Acount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcountRepository extends JpaRepository<Acount, Long> {
}
