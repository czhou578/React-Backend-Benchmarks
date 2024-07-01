package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SalesService {

    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY = 1000; // 1 second

    @Autowired
    private SalesRepo salesRepo;

    @Transactional
    public void deleteLastSalesOrderWithRetry() {
        int retries = MAX_RETRIES;
        while (retries > 0) {
            try {
                salesRepo.deleteByOrderIdDescLimitOne();
                System.out.println("Successfully deleted the last sales order.");
                return; // Exit the method if successful
            } catch (DataAccessException e) {
                if (e.getRootCause().getMessage().contains("Lock wait timeout exceeded")) {
                    System.out.println("Lock wait timeout, retrying... (" + retries + " attempts left)");
                    retries--;
                    if (retries > 0) {
                        try {
                            Thread.sleep(RETRY_DELAY);
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                            throw new RuntimeException("Thread interrupted during retry delay", ie);
                        }
                    }
                } else {
                    // If it's not a lock timeout issue, rethrow the exception
                    throw e;
                }
            }
        }
        // If we've exhausted all retries
        throw new RuntimeException("Failed to delete the last sales order after " + MAX_RETRIES + " attempts");
    }
}