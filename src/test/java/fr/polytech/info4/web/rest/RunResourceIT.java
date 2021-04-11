package fr.polytech.info4.web.rest;

import fr.polytech.info4.CoopcycleJhipsterApp;
import fr.polytech.info4.domain.Run;
import fr.polytech.info4.repository.RunRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RunResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleJhipsterApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RunResourceIT {

    private static final String DEFAULT_CLIENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_RUNNER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_RUNNER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_METHOD = "BBBBBBBBBB";

    @Autowired
    private RunRepository runRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRunMockMvc;

    private Run run;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Run createEntity(EntityManager em) {
        Run run = new Run()
            .clientName(DEFAULT_CLIENT_NAME)
            .runnerName(DEFAULT_RUNNER_NAME)
            .method(DEFAULT_METHOD);
        return run;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Run createUpdatedEntity(EntityManager em) {
        Run run = new Run()
            .clientName(UPDATED_CLIENT_NAME)
            .runnerName(UPDATED_RUNNER_NAME)
            .method(UPDATED_METHOD);
        return run;
    }

    @BeforeEach
    public void initTest() {
        run = createEntity(em);
    }

    @Test
    @Transactional
    public void createRun() throws Exception {
        int databaseSizeBeforeCreate = runRepository.findAll().size();
        // Create the Run
        restRunMockMvc.perform(post("/api/runs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(run)))
            .andExpect(status().isCreated());

        // Validate the Run in the database
        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeCreate + 1);
        Run testRun = runList.get(runList.size() - 1);
        assertThat(testRun.getClientName()).isEqualTo(DEFAULT_CLIENT_NAME);
        assertThat(testRun.getRunnerName()).isEqualTo(DEFAULT_RUNNER_NAME);
        assertThat(testRun.getMethod()).isEqualTo(DEFAULT_METHOD);
    }

    @Test
    @Transactional
    public void createRunWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = runRepository.findAll().size();

        // Create the Run with an existing ID
        run.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRunMockMvc.perform(post("/api/runs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(run)))
            .andExpect(status().isBadRequest());

        // Validate the Run in the database
        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkClientNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = runRepository.findAll().size();
        // set the field null
        run.setClientName(null);

        // Create the Run, which fails.


        restRunMockMvc.perform(post("/api/runs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(run)))
            .andExpect(status().isBadRequest());

        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRunnerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = runRepository.findAll().size();
        // set the field null
        run.setRunnerName(null);

        // Create the Run, which fails.


        restRunMockMvc.perform(post("/api/runs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(run)))
            .andExpect(status().isBadRequest());

        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMethodIsRequired() throws Exception {
        int databaseSizeBeforeTest = runRepository.findAll().size();
        // set the field null
        run.setMethod(null);

        // Create the Run, which fails.


        restRunMockMvc.perform(post("/api/runs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(run)))
            .andExpect(status().isBadRequest());

        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRuns() throws Exception {
        // Initialize the database
        runRepository.saveAndFlush(run);

        // Get all the runList
        restRunMockMvc.perform(get("/api/runs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(run.getId().intValue())))
            .andExpect(jsonPath("$.[*].clientName").value(hasItem(DEFAULT_CLIENT_NAME)))
            .andExpect(jsonPath("$.[*].runnerName").value(hasItem(DEFAULT_RUNNER_NAME)))
            .andExpect(jsonPath("$.[*].method").value(hasItem(DEFAULT_METHOD)));
    }
    
    @Test
    @Transactional
    public void getRun() throws Exception {
        // Initialize the database
        runRepository.saveAndFlush(run);

        // Get the run
        restRunMockMvc.perform(get("/api/runs/{id}", run.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(run.getId().intValue()))
            .andExpect(jsonPath("$.clientName").value(DEFAULT_CLIENT_NAME))
            .andExpect(jsonPath("$.runnerName").value(DEFAULT_RUNNER_NAME))
            .andExpect(jsonPath("$.method").value(DEFAULT_METHOD));
    }
    @Test
    @Transactional
    public void getNonExistingRun() throws Exception {
        // Get the run
        restRunMockMvc.perform(get("/api/runs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRun() throws Exception {
        // Initialize the database
        runRepository.saveAndFlush(run);

        int databaseSizeBeforeUpdate = runRepository.findAll().size();

        // Update the run
        Run updatedRun = runRepository.findById(run.getId()).get();
        // Disconnect from session so that the updates on updatedRun are not directly saved in db
        em.detach(updatedRun);
        updatedRun
            .clientName(UPDATED_CLIENT_NAME)
            .runnerName(UPDATED_RUNNER_NAME)
            .method(UPDATED_METHOD);

        restRunMockMvc.perform(put("/api/runs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRun)))
            .andExpect(status().isOk());

        // Validate the Run in the database
        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeUpdate);
        Run testRun = runList.get(runList.size() - 1);
        assertThat(testRun.getClientName()).isEqualTo(UPDATED_CLIENT_NAME);
        assertThat(testRun.getRunnerName()).isEqualTo(UPDATED_RUNNER_NAME);
        assertThat(testRun.getMethod()).isEqualTo(UPDATED_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingRun() throws Exception {
        int databaseSizeBeforeUpdate = runRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRunMockMvc.perform(put("/api/runs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(run)))
            .andExpect(status().isBadRequest());

        // Validate the Run in the database
        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRun() throws Exception {
        // Initialize the database
        runRepository.saveAndFlush(run);

        int databaseSizeBeforeDelete = runRepository.findAll().size();

        // Delete the run
        restRunMockMvc.perform(delete("/api/runs/{id}", run.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Run> runList = runRepository.findAll();
        assertThat(runList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
