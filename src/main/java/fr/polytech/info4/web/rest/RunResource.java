package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.Run;
import fr.polytech.info4.repository.RunRepository;
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
 * REST controller for managing {@link fr.polytech.info4.domain.Run}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RunResource {

    private final Logger log = LoggerFactory.getLogger(RunResource.class);

    private static final String ENTITY_NAME = "run";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RunRepository runRepository;

    public RunResource(RunRepository runRepository) {
        this.runRepository = runRepository;
    }

    /**
     * {@code POST  /runs} : Create a new run.
     *
     * @param run the run to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new run, or with status {@code 400 (Bad Request)} if the run has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/runs")
    public ResponseEntity<Run> createRun(@Valid @RequestBody Run run) throws URISyntaxException {
        log.debug("REST request to save Run : {}", run);
        if (run.getId() != null) {
            throw new BadRequestAlertException("A new run cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Run result = runRepository.save(run);
        return ResponseEntity.created(new URI("/api/runs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /runs} : Updates an existing run.
     *
     * @param run the run to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated run,
     * or with status {@code 400 (Bad Request)} if the run is not valid,
     * or with status {@code 500 (Internal Server Error)} if the run couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/runs")
    public ResponseEntity<Run> updateRun(@Valid @RequestBody Run run) throws URISyntaxException {
        log.debug("REST request to update Run : {}", run);
        if (run.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Run result = runRepository.save(run);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, run.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /runs} : get all the runs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of runs in body.
     */
    @GetMapping("/runs")
    public List<Run> getAllRuns() {
        log.debug("REST request to get all Runs");
        return runRepository.findAll();
    }

    /**
     * {@code GET  /runs/:id} : get the "id" run.
     *
     * @param id the id of the run to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the run, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/runs/{id}")
    public ResponseEntity<Run> getRun(@PathVariable Long id) {
        log.debug("REST request to get Run : {}", id);
        Optional<Run> run = runRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(run);
    }

    /**
     * {@code DELETE  /runs/:id} : delete the "id" run.
     *
     * @param id the id of the run to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/runs/{id}")
    public ResponseEntity<Void> deleteRun(@PathVariable Long id) {
        log.debug("REST request to delete Run : {}", id);
        runRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
