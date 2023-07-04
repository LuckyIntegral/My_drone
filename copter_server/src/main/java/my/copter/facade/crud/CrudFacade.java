package my.copter.facade.crud;

import my.copter.persistance.sql.entity.BaseEntity;

import java.util.Collection;

public interface CrudFacade<E> {
    void create(E entity);
    void update(E entity);
    void delete(Long id);
    E findById(Long id);
    Collection<E> findAll();
}