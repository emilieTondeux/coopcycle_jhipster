package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Basket.
 */
@Entity
@Table(name = "basket")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Basket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nb_elements", nullable = false)
    private Integer nbElements;

    @NotNull
    @Column(name = "price", nullable = false)
    private Integer price;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "basket_restaurant",
               joinColumns = @JoinColumn(name = "basket_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "restaurant_id", referencedColumnName = "id"))
    private Set<Restaurant> restaurants = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "basket_product",
               joinColumns = @JoinColumn(name = "basket_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();

    @OneToOne(mappedBy = "basket")
    @JsonIgnore
    private Run run;

    @ManyToOne
    @JsonIgnoreProperties(value = "baskets", allowSetters = true)
    private Acount acount;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNbElements() {
        return nbElements;
    }

    public Basket nbElements(Integer nbElements) {
        this.nbElements = nbElements;
        return this;
    }

    public void setNbElements(Integer nbElements) {
        this.nbElements = nbElements;
    }

    public Integer getPrice() {
        return price;
    }

    public Basket price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public Basket restaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
        return this;
    }

    public Basket addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.getBaskets().add(this);
        return this;
    }

    public Basket removeRestaurant(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.getBaskets().remove(this);
        return this;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Basket products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Basket addProduct(Product product) {
        this.products.add(product);
        product.getBaskets().add(this);
        return this;
    }

    public Basket removeProduct(Product product) {
        this.products.remove(product);
        product.getBaskets().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Run getRun() {
        return run;
    }

    public Basket run(Run run) {
        this.run = run;
        return this;
    }

    public void setRun(Run run) {
        this.run = run;
    }

    public Acount getAcount() {
        return acount;
    }

    public Basket acount(Acount acount) {
        this.acount = acount;
        return this;
    }

    public void setAcount(Acount acount) {
        this.acount = acount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Basket)) {
            return false;
        }
        return id != null && id.equals(((Basket) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Basket{" +
            "id=" + getId() +
            ", nbElements=" + getNbElements() +
            ", price=" + getPrice() +
            "}";
    }
}
