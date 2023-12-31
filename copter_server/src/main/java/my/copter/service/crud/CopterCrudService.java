package my.copter.service.crud;

import my.copter.data.datatable.DataTableRequest;
import my.copter.persistence.sql.entity.product.Copter;

import org.springframework.data.domain.Page;

public interface CopterCrudService extends CrudService<Copter> {
    Page<Copter> findAllByBrand(String brand, DataTableRequest request);
    Page<Copter> findAllByCategory(String category, DataTableRequest request);
}
