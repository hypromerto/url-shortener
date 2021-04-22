
package com.erolcloud.auth.models;

import java.util.Date;

import org.bson.Document;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class QuotaStatus {
  	private final int usageCount;
	private final Date lastUsage;

	public Document getDocument() {
		return new Document()
			.append("usage_count", usageCount)
			.append("last_usage", lastUsage);
	}
}