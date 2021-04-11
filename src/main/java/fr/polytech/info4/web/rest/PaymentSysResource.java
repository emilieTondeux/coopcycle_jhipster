package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.PaymentSys;
import fr.polytech.info4.repository.PaymentSysRepository;
import fr.polytech.info4.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.polytech.info4.domain.PaymentSys}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PaymentSysResource {

    private final Logger log = LoggerFactory.getLogger(PaymentSysResource.class);

    private static final String ENTITY_NAME = "paymentSys";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaymentSysRepository paymentSysRepository;

    public PaymentSysResource(PaymentSysRepository paymentSysRepository) {
        this.paymentSysRepository = paymentSysRepository;
    }

    /**
     * {@code POST  /payment-sys} : Create a new paymentSys.
     *
     * @param paymentSys the paymentSys to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paymentSys, or with status {@code 400 (Bad Request)} if the paymentSys has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/payment-sys")
    public ResponseEntity<PaymentSys> createPaymentSys(@Valid @RequestBody PaymentSys paymentSys) throws URISyntaxException {
        log.debug("REST request to save PaymentSys : {}", paymentSys);
        if (paymentSys.getId() != null) {
            throw new BadRequestAlertException("A new paymentSys cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentSys result = paymentSysRepository.save(paymentSys);
        return ResponseEntity.created(new URI("/api/payment-sys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /payment-sys} : Updates an existing paymentSys.
     *
     * @param paymentSys the paymentSys to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentSys,
     * or with status {@code 400 (Bad Request)} if the paymentSys is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paymentSys couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/payment-sys")
    public ResponseEntity<PaymentSys> updatePaymentSys(@Valid @RequestBody PaymentSys paymentSys) throws URISyntaxException {
        log.debug("REST request to update PaymentSys : {}", paymentSys);
        if (paymentSys.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaymentSys result = paymentSysRepository.save(paymentSys);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentSys.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /payment-sys} : get all the paymentSys.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paymentSys in body.
     */
    @GetMapping("/payment-sys")
    public List<PaymentSys> getAllPaymentSys(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PaymentSys");
        return paymentSysRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /payment-sys/:id} : get the "id" paymentSys.
     *
     * @param id the id of the paymentSys to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paymentSys, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payment-sys/{id}")
    public ResponseEntity<PaymentSys> getPaymentSys(@PathVariable Long id) {
        log.debug("REST request to get PaymentSys : {}", id);
        Optional<PaymentSys> paymentSys = paymentSysRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(paymentSys);
    }

    /**
     * {@code DELETE  /payment-sys/:id} : delete the "id" paymentSys.
     *
     * @param id the id of the paymentSys to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/payment-sys/{id}")
    public ResponseEntity<Void> deletePaymentSys(@PathVariable Long id) {
        log.debug("REST request to delete PaymentSys : {}", id);
        paymentSysRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
