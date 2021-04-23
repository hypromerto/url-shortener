
package com.erolcloud.auth.models;

import java.util.Date;

import org.bson.Document;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class Quota{
  	private int used;
	private Date last;

	public Document getDocument() {
		return new Document()
			.append("used", used)
			.append("last", last);
	}
}