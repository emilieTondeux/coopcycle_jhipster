package fr.polytech.info4.web.rest;

import fr.polytech.info4.CoopcycleJhipsterApp;
import fr.polytech.info4.domain.PaymentSys;
import fr.polytech.info4.repository.PaymentSysRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PaymentSysResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleJhipsterApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PaymentSysResourceIT {

    private static final String DEFAULT_CREDITEUR = "AAAAAAAAAA";
    private static final String UPDATED_CREDITEUR = "BBBBBBBBBB";

    private static final String DEFAULT_DEBITEUR = "AAAAAAAAAA";
    private static final String UPDATED_DEBITEUR = "BBBBBBBBBB";

    private static final String DEFAULT_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_METHOD = "BBBBBBBBBB";

    @Autowired
    private PaymentSysRepository paymentSysRepository;

    @Mock
    private PaymentSysRepository paymentSysRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaymentSysMockMvc;

    private PaymentSys paymentSys;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentSys createEntity(EntityManager em) {
        PaymentSys paymentSys = new PaymentSys()
            .crediteur(DEFAULT_CREDITEUR)
            .debiteur(DEFAULT_DEBITEUR)
            .method(DEFAULT_METHOD);
        return paymentSys;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentSys createUpdatedEntity(EntityManager em) {
        PaymentSys paymentSys = new PaymentSys()
            .crediteur(UPDATED_CREDITEUR)
            .debiteur(UPDATED_DEBITEUR)
            .method(UPDATED_METHOD);
        return paymentSys;
    }

    @BeforeEach
    public void initTest() {
        paymentSys = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaymentSys() throws Exception {
        int databaseSizeBeforeCreate = paymentSysRepository.findAll().size();
        // Create the PaymentSys
        restPaymentSysMockMvc.perform(post("/api/payment-sys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentSys)))
            .andExpect(status().isCreated());

        // Validate the PaymentSys in the database
        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentSys testPaymentSys = paymentSysList.get(paymentSysList.size() - 1);
        assertThat(testPaymentSys.getCrediteur()).isEqualTo(DEFAULT_CREDITEUR);
        assertThat(testPaymentSys.getDebiteur()).isEqualTo(DEFAULT_DEBITEUR);
        assertThat(testPaymentSys.getMethod()).isEqualTo(DEFAULT_METHOD);
    }

    @Test
    @Transactional
    public void createPaymentSysWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paymentSysRepository.findAll().size();

        // Create the PaymentSys with an existing ID
        paymentSys.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentSysMockMvc.perform(post("/api/payment-sys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentSys)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentSys in the database
        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCrediteurIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentSysRepository.findAll().size();
        // set the field null
        paymentSys.setCrediteur(null);

        // Create the PaymentSys, which fails.


        restPaymentSysMockMvc.perform(post("/api/payment-sys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentSys)))
            .andExpect(status().isBadRequest());

        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDebiteurIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentSysRepository.findAll().size();
        // set the field null
        paymentSys.setDebiteur(null);

        // Create the PaymentSys, which fails.


        restPaymentSysMockMvc.perform(post("/api/payment-sys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentSys)))
            .andExpect(status().isBadRequest());

        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMethodIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentSysRepository.findAll().size();
        // set the field null
        paymentSys.setMethod(null);

        // Create the PaymentSys, which fails.


        restPaymentSysMockMvc.perform(post("/api/payment-sys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentSys)))
            .andExpect(status().isBadRequest());

        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPaymentSys() throws Exception {
        // Initialize the database
        paymentSysRepository.saveAndFlush(paymentSys);

        // Get all the paymentSysList
        restPaymentSysMockMvc.perform(get("/api/payment-sys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentSys.getId().intValue())))
            .andExpect(jsonPath("$.[*].crediteur").value(hasItem(DEFAULT_CREDITEUR)))
            .andExpect(jsonPath("$.[*].debiteur").value(hasItem(DEFAULT_DEBITEUR)))
            .andExpect(jsonPath("$.[*].method").value(hasItem(DEFAULT_METHOD)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPaymentSysWithEagerRelationshipsIsEnabled() throws Exception {
        when(paymentSysRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPaymentSysMockMvc.perform(get("/api/payment-sys?eagerload=true"))
            .andExpect(status().isOk());

        verify(paymentSysRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPaymentSysWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(paymentSysRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPaymentSysMockMvc.perform(get("/api/payment-sys?eagerload=true"))
            .andExpect(status().isOk());

        verify(paymentSysRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPaymentSys() throws Exception {
        // Initialize the database
        paymentSysRepository.saveAndFlush(paymentSys);

        // Get the paymentSys
        restPaymentSysMockMvc.perform(get("/api/payment-sys/{id}", paymentSys.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paymentSys.getId().intValue()))
            .andExpect(jsonPath("$.crediteur").value(DEFAULT_CREDITEUR))
            .andExpect(jsonPath("$.debiteur").value(DEFAULT_DEBITEUR))
            .andExpect(jsonPath("$.method").value(DEFAULT_METHOD));
    }
    @Test
    @Transactional
    public void getNonExistingPaymentSys() throws Exception {
        // Get the paymentSys
        restPaymentSysMockMvc.perform(get("/api/payment-sys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaymentSys() throws Exception {
        // Initialize the database
        paymentSysRepository.saveAndFlush(paymentSys);

        int databaseSizeBeforeUpdate = paymentSysRepository.findAll().size();

        // Update the paymentSys
        PaymentSys updatedPaymentSys = paymentSysRepository.findById(paymentSys.getId()).get();
        // Disconnect from session so that the updates on updatedPaymentSys are not directly saved in db
        em.detach(updatedPaymentSys);
        updatedPaymentSys
            .crediteur(UPDATED_CREDITEUR)
            .debiteur(UPDATED_DEBITEUR)
            .method(UPDATED_METHOD);

        restPaymentSysMockMvc.perform(put("/api/payment-sys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaymentSys)))
            .andExpect(status().isOk());

        // Validate the PaymentSys in the database
        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeUpdate);
        PaymentSys testPaymentSys = paymentSysList.get(paymentSysList.size() - 1);
        assertThat(testPaymentSys.getCrediteur()).isEqualTo(UPDATED_CREDITEUR);
        assertThat(testPaymentSys.getDebiteur()).isEqualTo(UPDATED_DEBITEUR);
        assertThat(testPaymentSys.getMethod()).isEqualTo(UPDATED_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingPaymentSys() throws Exception {
        int databaseSizeBeforeUpdate = paymentSysRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaymentSysMockMvc.perform(put("/api/payment-sys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentSys)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentSys in the database
        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaymentSys() throws Exception {
        // Initialize the database
        paymentSysRepository.saveAndFlush(paymentSys);

        int databaseSizeBeforeDelete = paymentSysRepository.findAll().size();

        // Delete the paymentSys
        restPaymentSysMockMvc.perform(delete("/api/payment-sys/{id}", paymentSys.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PaymentSys> paymentSysList = paymentSysRepository.findAll();
        assertThat(paymentSysList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
