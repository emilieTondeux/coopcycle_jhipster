package fr.polytech.info4.repository;

import fr.polytech.info4.domain.PaymentSys;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PaymentSys entity.
 */
@Repository
public interface PaymentSysRepository extends JpaRepository<PaymentSys, Long> {

    @Query(value = "select distinct paymentSys from PaymentSys paymentSys left join fetch paymentSys.acounts",
        countQuery = "select count(distinct paymentSys) from PaymentSys paymentSys")
    Page<PaymentSys> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct paymentSys from PaymentSys paymentSys left join fetch paymentSys.acounts")
    List<PaymentSys> findAllWithEagerRelationships();

    @Query("select paymentSys from PaymentSys paymentSys left join fetch paymentSys.acounts where paymentSys.id =:id")
    Optional<PaymentSys> findOneWithEagerRelationships(@Param("id") Long id);
}
