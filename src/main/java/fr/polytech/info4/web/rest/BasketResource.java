package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.Basket;
import fr.polytech.info4.repository.BasketRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link fr.polytech.info4.domain.Basket}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BasketResource {

    private final Logger log = LoggerFactory.getLogger(BasketResource.class);

    private static final String ENTITY_NAME = "basket";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BasketRepository basketRepository;

    public BasketResource(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    /**
     * {@code POST  /baskets} : Create a new basket.
     *
     * @param basket the basket to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new basket, or with status {@code 400 (Bad Request)} if the basket has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/baskets")
    public ResponseEntity<Basket> createBasket(@Valid @RequestBody Basket basket) throws URISyntaxException {
        log.debug("REST request to save Basket : {}", basket);
        if (basket.getId() != null) {
            throw new BadRequestAlertException("A new basket cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Basket result = basketRepository.save(basket);
        return ResponseEntity.created(new URI("/api/baskets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /baskets} : Updates an existing basket.
     *
     * @param basket the basket to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated basket,
     * or with status {@code 400 (Bad Request)} if the basket is not valid,
     * or with status {@code 500 (Internal Server Error)} if the basket couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/baskets")
    public ResponseEntity<Basket> updateBasket(@Valid @RequestBody Basket basket) throws URISyntaxException {
        log.debug("REST request to update Basket : {}", basket);
        if (basket.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Basket result = basketRepository.save(basket);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, basket.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /baskets} : get all the baskets.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of baskets in body.
     */
    @GetMapping("/baskets")
    public List<Basket> getAllBaskets(@RequestParam(required = false) String filter,@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("run-is-null".equals(filter)) {
            log.debug("REST request to get all Baskets where run is null");
            return StreamSupport
                .stream(basketRepository.findAll().spliterator(), false)
                .filter(basket -> basket.getRun() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Baskets");
        return basketRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /baskets/:id} : get the "id" basket.
     *
     * @param id the id of the basket to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the basket, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/baskets/{id}")
    public ResponseEntity<Basket> getBasket(@PathVariable Long id) {
        log.debug("REST request to get Basket : {}", id);
        Optional<Basket> basket = basketRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(basket);
    }

    /**
     * {@code DELETE  /baskets/:id} : delete the "id" basket.
     *
     * @param id the id of the basket to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/baskets/{id}")
    public ResponseEntity<Void> deleteBasket(@PathVariable Long id) {
        log.debug("REST request to delete Basket : {}", id);
        basketRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
