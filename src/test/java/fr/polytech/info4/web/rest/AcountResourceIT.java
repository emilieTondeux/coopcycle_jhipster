package fr.polytech.info4.web.rest;

import fr.polytech.info4.CoopcycleJhipsterApp;
import fr.polytech.info4.domain.Acount;
import fr.polytech.info4.repository.AcountRepository;

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
 * Integration tests for the {@link AcountResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleJhipsterApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AcountResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 0;
    private static final Integer UPDATED_AGE = 1;

    private static final String DEFAULT_ACCOUNT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADRESS = "BBBBBBBBBB";

    @Autowired
    private AcountRepository acountRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAcountMockMvc;

    private Acount acount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acount createEntity(EntityManager em) {
        Acount acount = new Acount()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .age(DEFAULT_AGE)
            .accountID(DEFAULT_ACCOUNT_ID)
            .adress(DEFAULT_ADRESS);
        return acount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acount createUpdatedEntity(EntityManager em) {
        Acount acount = new Acount()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .age(UPDATED_AGE)
            .accountID(UPDATED_ACCOUNT_ID)
            .adress(UPDATED_ADRESS);
        return acount;
    }

    @BeforeEach
    public void initTest() {
        acount = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcount() throws Exception {
        int databaseSizeBeforeCreate = acountRepository.findAll().size();
        // Create the Acount
        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isCreated());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeCreate + 1);
        Acount testAcount = acountList.get(acountList.size() - 1);
        assertThat(testAcount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAcount.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testAcount.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testAcount.getAccountID()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testAcount.getAdress()).isEqualTo(DEFAULT_ADRESS);
    }

    @Test
    @Transactional
    public void createAcountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acountRepository.findAll().size();

        // Create the Acount with an existing ID
        acount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = acountRepository.findAll().size();
        // set the field null
        acount.setName(null);

        // Create the Acount, which fails.


        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = acountRepository.findAll().size();
        // set the field null
        acount.setSurname(null);

        // Create the Acount, which fails.


        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAccountIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = acountRepository.findAll().size();
        // set the field null
        acount.setAccountID(null);

        // Create the Acount, which fails.


        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdressIsRequired() throws Exception {
        int databaseSizeBeforeTest = acountRepository.findAll().size();
        // set the field null
        acount.setAdress(null);

        // Create the Acount, which fails.


        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcounts() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        // Get all the acountList
        restAcountMockMvc.perform(get("/api/acounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].accountID").value(hasItem(DEFAULT_ACCOUNT_ID)))
            .andExpect(jsonPath("$.[*].adress").value(hasItem(DEFAULT_ADRESS)));
    }
    
    @Test
    @Transactional
    public void getAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        // Get the acount
        restAcountMockMvc.perform(get("/api/acounts/{id}", acount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(acount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.accountID").value(DEFAULT_ACCOUNT_ID))
            .andExpect(jsonPath("$.adress").value(DEFAULT_ADRESS));
    }
    @Test
    @Transactional
    public void getNonExistingAcount() throws Exception {
        // Get the acount
        restAcountMockMvc.perform(get("/api/acounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        int databaseSizeBeforeUpdate = acountRepository.findAll().size();

        // Update the acount
        Acount updatedAcount = acountRepository.findById(acount.getId()).get();
        // Disconnect from session so that the updates on updatedAcount are not directly saved in db
        em.detach(updatedAcount);
        updatedAcount
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .age(UPDATED_AGE)
            .accountID(UPDATED_ACCOUNT_ID)
            .adress(UPDATED_ADRESS);

        restAcountMockMvc.perform(put("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcount)))
            .andExpect(status().isOk());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeUpdate);
        Acount testAcount = acountList.get(acountList.size() - 1);
        assertThat(testAcount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAcount.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testAcount.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testAcount.getAccountID()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAcount.getAdress()).isEqualTo(UPDATED_ADRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingAcount() throws Exception {
        int databaseSizeBeforeUpdate = acountRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcountMockMvc.perform(put("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        int databaseSizeBeforeDelete = acountRepository.findAll().size();

        // Delete the acount
        restAcountMockMvc.perform(delete("/api/acounts/{id}", acount.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
