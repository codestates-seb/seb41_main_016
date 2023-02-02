package com.mainproject.domain.reservation.repository;

import com.mainproject.domain.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
